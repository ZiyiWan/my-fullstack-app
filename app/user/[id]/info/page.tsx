import { Col, Row } from "antd";
import UserCard from "./components/UserCard";
import axiosInstance from "@/app/lib/axiosInstance";
import BankInfoDes from "./components/BankInfoDes";
import CoursesList from "./components/CoursesList";

interface Props {
  params: { id: string };
  searchParams: { new: string };
}

const UserInfoPage = async ({ params, searchParams }: Props) => {
  const res = await axiosInstance.get(`/api/user/${params.id}`);
  const user = res.data.user;

  return (
    <>
      <Row>
        <Col span={6}>
          <UserCard name={user.accname} email={user.email} phone={user.phone} />
        </Col>
        <Col span={18} className="flex flex-col justify-center gap-5">
          <BankInfoDes
            accname={user.accname}
            accnum={user.accnum}
            bsb={user.bsb}
            bankname={user.bankname}
          />
          <CoursesList />
        </Col>
      </Row>
    </>
  );
};

export default UserInfoPage;
