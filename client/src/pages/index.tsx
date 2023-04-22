import Layout from "@/layouts/Layout"
import GlobeShareSVG from "@/components/common/GlobeShareSVG"
import Link from "next/link"
import { Button } from "@/components/common/Button"
import { Card } from 'antd';
import Image from "next/image";
import useLoader from "@/hooks/useLoader";
import store from "@/redux/store";

const { Meta } = Card;

const cardData = [
  { title: ' Last Activity ', description: "www.instagram.com" },
  { title: ' Teams ', description: "www.instagram.com" },
  { title: ' Tasks ', description: "www.instagram.com" },
  { title: 'Projects', description: "www.instagram.com" },
]


export default function Home(): JSX.Element {
  const { user } = store.getState().auth
  const isLoading = useLoader()

  return (
    <Layout>
      {/* <span className="ml-auto text-xl"> Visited Lately</span> */}

      <h1 className="text-2xl text-center"><span className="font-normal">Welcome Back</span> <span className="underline">{user && `${user.firstName}  ${user.lastName}`}</span></h1>
      <div className="flex flex-wrap gap-5 mb-10">

        {cardData?.map((item, indexId) => {
          return (
            <Card
              bordered={false}
              key={indexId}
              hoverable
              style={{ width: 240 }}
              cover={<Image width={100} height={100} alt="example" src="https://cdn.monday.com/images/quick_search_recent_board.svg" />}
            >
              <Meta title={item.title} description={item.description} />
            </Card>
          )
        })}

      </div>

      {/* <GlobeShareSVG className="mb-10" /> */}

      <div className="text-center">
        <p className=" font-semibold text-2xl mt-5 mb-3"> שתף דפים או אזכר צוותים במקום חברים בודדים </p>
        <p className="text-md"> צור צוות עכשיו או <Link href={"/"}> למד כיצד אתה יכול לשתף פעולה עם צוותים </Link></p>
      </div>


      <Button fontSize="sm" label="צור צוות חדש" variant="default"></Button>

    </Layout>
  )
}
