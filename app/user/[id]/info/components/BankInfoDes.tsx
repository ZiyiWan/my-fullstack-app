import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import React from "react";

const BankInfoDes = ({
  accnum,
  bsb,
  accname,
  bankname,
}: {
  accnum: string;
  bsb: string;
  accname: string;
  bankname: string;
}) => {
  const items: DescriptionsProps["items"] = [
    { key: 1, label: "Account Number", children: accnum },
    { key: 2, label: "BSB", children: bsb },
    { key: 3, label: "Account Name", children: accname },
    { key: 4, label: "Bank Name", children: bankname },
  ];
  return (
    <div>
      <Descriptions
        title="Bank Information"
        items={items}
        bordered
        style={{ maxWidth: 1000 }}
      />
    </div>
  );
};

export default BankInfoDes;
