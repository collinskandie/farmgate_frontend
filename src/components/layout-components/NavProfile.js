
import React, { useEffect, useState } from "react";
import { Dropdown, Avatar } from "antd";
import { useDispatch } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import NavItem from "./NavItem";
import Flex from "components/shared-components/Flex";
import { signOut } from "store/slices/authSlice";
import styled from "@emotion/styled";
import {
  FONT_WEIGHT,
  MEDIA_QUERIES,
  SPACER,
  FONT_SIZES,
} from "constants/ThemeConstant";

const Icon = styled.div(() => ({
  fontSize: FONT_SIZES.LG,
}));

const Profile = styled.div(() => ({
  display: "flex",
  alignItems: "center",
}));

const UserInfo = styled("div")`
  padding-left: ${SPACER[2]};

  @media ${MEDIA_QUERIES.MOBILE} {
    display: none;
  }
`;
const Name = styled.div(() => ({
  fontWeight: FONT_WEIGHT.SEMIBOLD,
}));

const Title = styled.span(() => ({
  opacity: 0.8,
}));

const MenuItemSignOut = (props) => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div onClick={handleSignOut}>
      <Flex alignItems="center" gap={SPACER[2]}>
        <Icon>
          <LogoutOutlined />
        </Icon>
        <span>{props.label}</span>
      </Flex>
    </div>
  );
};

const items = [
  {
    key: "Sign Out",
    label: <MenuItemSignOut label="Sign Out" />,
  },
];

export const NavProfile = ({ mode }) => {
  const [user, setUser] = useState({
    name: "",
    avatar: "",
    email: "",
  });

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUserData) {
      setUser(storedUserData);
    }
  }, []);

  // Extract initials from full name
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Dropdown placement="bottomRight" menu={{ items }} trigger={["click"]}>
      <NavItem mode={mode}>
        <Profile>
          <Avatar src={user?.avatar || undefined}>
            {!user?.avatar && initials} {/* Show initials if no avatar */}
          </Avatar>
          <UserInfo className="profile-text">
            <Name>{user?.name}</Name>
            <Title>{user?.roles}</Title>
          </UserInfo>
        </Profile>
      </NavItem>
    </Dropdown>
  );
};

export default NavProfile;
