import React, {useEffect} from "react";
import useFetchList from "@/hooks/useFetchList";
import { ARCHIVES_PAGESIZE } from "@/utils/config";
import "./index.less";
import { Link } from "react-router-dom";
import { Spin, Timeline } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Fragment } from "react";
import { groupBy } from '@/utils'

const Archives = (props) => {
  const { dataList, loading, pagination } = useFetchList({
    requestUrl: `/log/article/list`, //https://www.fastmock.site/mock/a136e622ecf396cd60384ab5cc88ed86/log/article/list
    queryParams: {
      pageSize: ARCHIVES_PAGESIZE,
    },
    routerParams: [props.location.search],
  });

  const list = groupBy(dataList, item => item.createdAt.slice(0, 4)) // 按年份排序
  console.log(list)
  return (
    <div className="app-archives">
       <Spin tip='loading...' spinning={loading} delay={100}>
       <Timeline>
          {list.map((d, i) => {
            return (
                <Fragment key={i}>
              {i === 0 && (
                <Timeline.Item>
                  <span className="desc">{`${pagination.total} posts in total.`}</span>
                  <br />
                  <br />
                </Timeline.Item>
              )}

              <Timeline.Item
                dot={<ClockCircleOutlined className="timeline-clock-icon" />}
                color="red"
              >
                <div className='year'>
                    {d[0]['createdAt'].slice(0,4)}
                    ...
                </div>
                <br />
              </Timeline.Item>
              {d.map(item => (
                <Timeline.Item key={item.id}>
                  <span style={{ fontSize: '13px', marginRight: '16px' }}>{item.createdAt.slice(5, 10)}</span>
                  <Link to={`/article/${item.id}`}>{item.title}</Link>
                </Timeline.Item>
              ))}
            </Fragment>
            )
          })}
        </Timeline>
       </Spin>
      
    </div>
  );
};
export default Archives;
