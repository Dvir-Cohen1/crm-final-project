import Layout from "@/layouts/Layout"
import GlobeShareSVG from "@/components/common/GlobeShareSVG"
import Link from "next/link"
import { Button } from "@/components/common/Button"
import { Card } from 'antd';
import Image from "next/image";
import useLoader from "@/hooks/useLoader";

const { Meta } = Card;

const cardData = [
  { title: 'אנשי קשר', description: "www.instagram.com" },
  { title: 'משימות', description: "www.instagram.com" },
]



const data = [
  {
    name: 'ינואר',
    הכנסות: 4000,
    הוצאות: 2400,
    amt: 2400,
  },
  {
    name: 'פברואר',
    הכנסות: 3000,
    הוצאות: 1398,
    amt: 2210,
  },
  {
    name: 'מרץ',
    הכנסות: 2000,
    הוצאות: 9800,
    amt: 2290,
  },
  {
    name: 'אפריל',
    הכנסות: 2780,
    הוצאות: 3908,
    amt: 2000,
  },
  {
    name: 'מאי',
    הכנסות: 1890,
    הוצאות: 4800,
    amt: 2181,
  },
  {
    name: 'יוני',
    הכנסות: 2390,
    הוצאות: 3800,
    amt: 2500,
  },
  {
    name: 'יולי',
    הכנסות: 3490,
    הוצאות: 4300,
    amt: 2100,
  },
  {
    name: 'אוגוסט',
    הכנסות: 3490,
    הוצאות: 4300,
    amt: 2100,
  },
  {
    name: 'ספטמבר',
    הכנסות: 3490,
    הוצאות: 4300,
    amt: 2100,
  },
  {
    name: 'אוקטובר',
    הכנסות: 3490,
    הוצאות: 4300,
    amt: 2100,
  },
  {
    name: 'נומבר',
    הכנסות: 3490,
    הוצאות: 4300,
    amt: 2100,
  },
  {
    name: 'דצמבר',
    הכנסות: 3490,
    הוצאות: 4300,
    amt: 2100,
  },
];


const data2 = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];


export default function Home(): JSX.Element {
  const isLoading = useLoader()

  return (
    <Layout>
      <span className="ml-auto text-xl"> Visited Lately</span>
      <div className="flex gap-5 mb-10">

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

      <GlobeShareSVG className="mb-10" />
      <p className="font-semibold text-2xl mt-5 mb-3"> שתף דפים או אזכר צוותים במקום חברים בודדים </p>
      <p className="text-md"> צור צוות עכשיו או <Link href={"/"}> למד כיצד אתה יכול לשתף פעולה עם צוותים </Link></p>
      <Button fontSize="sm" label="צור צוות חדש" variant="default"></Button>

    </Layout>
  )
}
