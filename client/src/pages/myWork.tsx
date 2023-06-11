import React from 'react'
import Layout from '@/layouts/Layout'
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
const { Panel } = Collapse;
import CustomTable from '@/components/common/CustomTable';
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


const MyWork = () => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 10,
    // background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <Layout>
      <div className='text-2xl font-semibold text-[#323338]'>My Work</div>
      <hr className='mb-5' />


      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: '#FAFBFC' }}
      >
        <Panel header="This Week" key="1" style={panelStyle}>
        <CustomTable/>
        </Panel>
        <Panel header="Next Week" key="2" style={panelStyle}>
        <CustomTable/>
        </Panel>
        <Panel header="This is panel header 3" key="3" style={panelStyle}>
          <CustomTable/>
        </Panel>
      </Collapse>
    </Layout>
  )
}

export default MyWork