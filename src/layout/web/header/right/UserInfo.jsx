import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import useBus from "@/hooks/useBus";
import AppAvatar from "@/components/Avatar";
import { loginout } from "@/store/user/actions";

const UserInfo = (props) => {
  const dispatch = useDispatch();
  const bus = useBus();
  const userInfo = useSelector((state) => state.user);
  const { username, role } = userInfo;
  console.log(role);
  const menuOverlay = (
    <Menu>
      {role === 1 && (
        <Menu.Item>
          <span onClick={(e) => bus.emit("openUploadModal")}>导入文章</span>
        </Menu.Item>
      )}
      {role === 1 && (
        <Menu.Item>
          <span onClick={(e) => props.history.push("/admin")}>后台管理</span>
        </Menu.Item>
      )}
      <Menu.Item>
      <span className='user-logout' onClick={e => handleMenuClick('loginout')}>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  function handleMenuClick(type) {
    switch (type) {
      case "login":
        bus.emit("openSignModal", "login");
        break;
      case "register":
        bus.emit("openSignModal", "register");
        break;
      case "loginout":
        dispatch(loginout());
        break;
      default:
        break;
    }
  }

  return (
    <div className="header-userInfo">
      {username ? (
        <Dropdown placement='bottomCenter' overlay={menuOverlay} trigger={['click', 'hover']}>
          <div style={{ height: 55 }}>
            <AppAvatar userInfo={userInfo}/>
          </div>
        </Dropdown>
      ) : (
        <>
          <Button
            ghost
            type="primary"
            size="small"
            style={{ marginRight: 20 }}
            className="btn-radius-4"
            onClick={()=>handleMenuClick('login')}
          >
            登录
          </Button>
          <Button
            onClick={()=>handleMenuClick('register')}
            ghost
            type="danger"
            className="btn-radius-4"
            size="small"
          >
            注册
          </Button>
        </>
      )}
    </div>
  );
};
export default UserInfo;
