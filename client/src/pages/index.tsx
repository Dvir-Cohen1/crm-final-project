import Layout from "@/layouts/Layout"
import GlobeShareSVG from "@/components/common/GlobeShareSVG"
import Link from "next/link"
import { Button } from "@/components/common/Button"
import { Card } from 'antd';
import Image from "next/image";
import useLoader from "@/hooks/useLoader";
import store from "@/redux/store";
import { RootState } from "@/types/global";
import { useSelector } from "react-redux";
const { Meta } = Card;
import { Col, Row, Statistic } from 'antd';
import React from 'react';
// import CountUp from 'react-countup';
// const formatter = (value: number) => <CountUp end={value} separator="," />;


export default function Home(): JSX.Element {
  // const { user } = store.getState().auth
  const { user } = useSelector((state: RootState) => state.auth);
  const { tasks } = useSelector((state: RootState) => state.task);
  const users = useSelector((state: RootState) => state.user.users);
  const isLoading = useLoader()
  const cardData = [
    { title: 'Projects', path: '/projects', description: "Projects" },
    { title: ' Tasks ', path: '/tasks', description: "Tasks" },
    { title: ' Users ', path: '/users', description: `All Users: ${users?.length || 0}` },
    { title: ' Last Activity ', path: '/', description: "Last Activity" },
  ]


  return (
    <Layout>

      <section id="Home">
        <h1 className="text-2xl text-center my-10"><span className="font-normal">Welcome Back</span> <span className="underline">{user && `${user.firstName}  ${user.lastName}`}</span></h1>
        <div className="flex flex-wrap justify-center gap-5 mb-10">
          {cardData?.map((item, indexId) => {
            return (
              <Link href={item.path} key={indexId}>
                <Card
                  bordered={false}
                  key={indexId}
                  hoverable
                  className="w-36 sm:w-44 lg:w-full"
                  cover={<Image width={80} height={80} alt="example" src="https://cdn.monday.com/images/quick_search_recent_board.svg" />}
                >
                  <Meta title={item.title} description={item.description} />
                </Card>
              </Link>
            )
          })}
        </div>
        <Row className=" flex justify-center text-center mb-10" gutter={16}>
          <Col span={6}>
            <Statistic title="Active Users" value={users?.length || 0} />
          </Col>
          <Col span={6}>
            <Statistic title="Tasks" value={tasks?.length || 0} />
          </Col>
        </Row>
        {/* <GlobeShareSVG className="mb-10" /> */}
        <div className="text-center">
          <p className=" font-semibold text-2xl mt-5 mb-3"> Share pages or mention a team instead of individual members</p>
          <p className="text-md"> Create a team now or<Link href={"/"}> Learn how you can collaborate with teams</Link></p>
        </div>
        <Button fontSize="sm" label="Create new Team" variant="default"></Button>
      </section>

    </Layout>
  )
}
