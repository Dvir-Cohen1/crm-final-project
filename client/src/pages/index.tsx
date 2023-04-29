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



export default function Home(): JSX.Element {
  // const { user } = store.getState().auth
  const { user } = useSelector((state: RootState) => state.auth);
  const users = useSelector((state: RootState) => state.user.users);
  const isLoading = useLoader()
  console.log(users)
  const cardData = [
    { title: 'Projects', path: '/projects', description: "Projects" },
    { title: ' Tasks ', path: '/tasks', description: "Tasks" },
    { title: ' Users ', path: '/users', description:`All Users: ${users?.length || 0}` },
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
                  className="w-64 lg:w-full"
                  // style={{ width: 240 }}
                  cover={<Image width={100} height={100} alt="example" src="https://cdn.monday.com/images/quick_search_recent_board.svg" />}
                >
                  <Meta title={item.title} description={item.description} />
                </Card>
              </Link>
            )
          })}
        </div>
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
