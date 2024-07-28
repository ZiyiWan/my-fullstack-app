"use client";
import {
  Form,
  Select,
  InputNumber,
  Button,
  Row,
  Col,
  Table,
  Input,
  Typography,
} from "antd";
import { useState } from "react";
import { jsPDF } from "jspdf";
import emailjs from "@emailjs/browser";
import "jspdf-autotable";

const initialData: {
  key: string;
  unitcode: string;
  hours: number;
  rate: number;
  totalStudents: number;
  comment?: string;
}[] = [];

const columns = [
  {
    title: "Unit Code",
    dataIndex: "unitcode",
    key: "unitcode",
  },
  {
    title: "Working Hours",
    dataIndex: "hours",
    key: "hours",
  },
  {
    title: "Hourly Rate",
    dataIndex: "rate",
    key: "rate",
  },
  {
    title: "Amount Students",
    dataIndex: "totalStudents",
    key: "totalStudents",
  },
  {
    title: "Comment",
    dataIndex: "comment",
    key: "comment",
  },
];

const ServiceForm = () => {
  const { TextArea } = Input;
  const [services, setServices] = useState(initialData);
  const [totalSum, setTotalSum] = useState(0);

  const formatUnitCode = (unitCode: string) => {
    const match = unitCode.match(/(fit)(\d+)/i);
    if (match) {
      return `${match[1].toUpperCase()} ${match[2]}`;
    }
    return unitCode;
  };

  const calculateTotalPrice = (
    hours: number,
    rate: number,
    totalStudents: number
  ) => {
    return hours * rate + Math.max(0, (totalStudents - 10) * 5);
  };

  const onFinish = (values: any) => {
    const newService = {
      key: (services.length + 1).toString(),
      unitcode: formatUnitCode(values.unit),
      hours: values.hours,
      rate: values.rate,
      totalStudents: values.totalStudents,
      comment: values.comment,
    };

    const newTotalSum =
      totalSum +
      calculateTotalPrice(values.hours, values.rate, values.totalStudents);
    setServices([...services, newService]);
    setTotalSum(newTotalSum);
    console.log("Success:", values);
  };

  const generatePDF = async () => {
    const doc = new jsPDF();

    // 添加文本信息
    doc.setFontSize(12);
    doc.text("Name: Easy", 10, 10);
    doc.text("Account Number: 12345678", 10, 20);
    doc.text("BSB: 123-321", 10, 30);
    doc.text("Bank Name: ANZ", 10, 40);

    // 添加表格
    const tableColumn = [
      "Unit Code",
      "Working Hours",
      "Hourly Rate",
      "Amount Students",
      "Comment",
    ];
    const tableRows: (string | number)[][] = [];

    services.forEach((service) => {
      const serviceData = [
        service.unitcode,
        service.hours,
        service.rate,
        service.totalStudents,
        service.comment || "",
      ];
      tableRows.push(serviceData);
    });

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      theme: "striped",
      margin: { top: 10 },
    });
    //doc.save("invoice.pdf");
    const pdfData = doc.output("datauristring");
    const sendEmail = async (pdfData: string) => {
      const emailParams = {
        to_name: "Team",
        from_name: "Your Name",
        message: "Here is your PDF document.",
        attachment: pdfData,
      };

      try {
        const result = await emailjs.send(
          "your service_id",
          "your template_id",
          emailParams,
          "your user id"
        );
        console.log("Email sent successfully:", result.text);
      } catch (error) {
        console.error("Error sending email");
      }
    };

    await sendEmail(pdfData);
  };
  const InvoiceForm = () => {
    return (
      <Form
        name="add service"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400 }}
      >
        <Form.Item
          label="Unit Code"
          name="unit"
          rules={[
            {
              required: true,
              message: "Please input the Unit code",
            },
          ]}
        >
          <Select>
            <Select.Option value="fit9131">FIT 9131</Select.Option>
            <Select.Option value="fit9136">FIT 9136</Select.Option>
            <Select.Option value="fit9137">FIT 9137</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Working Hours"
          name="hours"
          rules={[
            {
              required: true,
              message: "Please input your working hours for this service",
            },
          ]}
        >
          <InputNumber defaultValue={0} />
        </Form.Item>
        <Form.Item
          label="Hourly Rate"
          name="rate"
          rules={[
            {
              required: true,
              message: "Please input the hourly rate for this course",
            },
          ]}
        >
          <InputNumber defaultValue={0} prefix="AU$" />
        </Form.Item>
        <Form.Item
          label="Amount Students"
          name="totalStudents"
          rules={[
            {
              required: true,
              message: "Please input the number of students",
            },
          ]}
        >
          <InputNumber defaultValue={0} />
        </Form.Item>

        <Form.Item label="Comment" name="comment">
          <TextArea rows={4} placeholder="Any comment?" maxLength={6} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    );
  };
  const { Title } = Typography;
  const ServicesList = () => {
    return (
      <div id="services-list">
        <Table dataSource={services} columns={columns} pagination={false} />
        <div style={{ textAlign: "right", margin: "20px 0" }}>
          <strong>Total Sum: AU$ {totalSum}</strong>
        </div>
      </div>
    );
  };

  return (
    <>
      <h2 style={{ margin: 5 }}>Services List</h2>
      <Row justify="space-around" align="top" style={{ margin: 10 }}>
        <Col span={8}>
          <InvoiceForm />
        </Col>
        <Col span={16}>
          <div
            id="pdf-content"
            style={{ padding: "20px", backgroundColor: "white" }}
          >
            <Title level={2}>Service List</Title>
            <ServicesList />
          </div>
          <Button type="primary" onClick={generatePDF}>
            Send
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ServiceForm;
