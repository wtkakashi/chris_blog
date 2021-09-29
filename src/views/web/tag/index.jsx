import React, { useState, useEffect } from "react";
import "./index.less";
import useFetchList from "@/hooks/useFetchList";
import { TAG_PAGESIZE } from "@/utils/config";
import { Timeline, Spin } from "antd";
import { Link } from "react-router-dom";
import axios from "@/utils/axios";
const List = (props) => {
  const tagName = props.match.params.name;
  const type = "tag";

  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    axios.get("/log/article/getTags", { params: { tagName } }).then((res) => {
      setDataList(res.rows);
      console.log(dataList);
    });
  }, []);

  console.log(dataList);
  return (
    <Spin tip="Loading..." spinning={loading} delay={100}>
      <div className="timeline">
        <Timeline>
          <Timeline.Item>
            <h1 className="list-title">
              {tagName}
              <small className="type-name">{type}</small>
            </h1>
            <br />
          </Timeline.Item>
          {dataList.map((item) => (
            <Timeline.Item key={item.id}>
              <span style={{ fontSize: "13px", marginRight: "16px" }}>
                {item.createdAt.slice(5, 10)}
              </span>
              <Link to={`/article/${item.id}`}>{item.title}</Link>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </Spin>
  );
};
export default List;
