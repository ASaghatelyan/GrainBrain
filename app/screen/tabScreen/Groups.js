import React, { createContext, useEffect, useState, TouchableNativeFeedback } from "react";
import { Text, ScrollView, StatusBar, View, TouchableOpacity, Image } from "react-native";
import InputBlue from "../../component/inputBlue/InputBlue";
import { styles } from "../../style/UsersStyles";
import { GroupDataFunc } from "../../component/data/Data";
import axiosInstance from "../../networking/axiosinstance";
import Loading from "../../component/loading/Loading";
import ModalGroup from "../../component/modalGroup/ModalGroup";
import PrivateModal from "../../component/privateModal";

export const UsersContext = createContext();

export default function Groups(props) {

  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [state, setState] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [add_group, setAdd_Group] = useState({});
  const [modalState, setModalState] = useState(false);
  const [joinData, setJoinDAta] = useState(null);
  const [password, setPassword] = useState("");
  const [joinDAtaState, setJoinDAtaState] = useState(false);

  const modalPrivateFunc = (evt) => {
    setModalState(evt);
  };

  useEffect(() => {
    if (Object.keys(add_group).length) {
      const arr = data;
      data.unshift({
        state: "public",
        group_name: add_group.name,
        id: add_group.id,
      });
      setData([...arr]);
    }
  }, [add_group]);

  const groupNameFunc = (evt) => {
    setAdd_Group(evt);
  };

  const modalFunc = (val) => {
    setVisibleModal(val);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      handle();
    });
    return unsubscribe;
  }, [props.navigation]);

  const handle = async () => {
    setVisible(true);
    try {
      const response = await axiosInstance.get("/ChatGroup");
      console.log(response);
      setData([...response.data.message]);
      setVisible(false);
    } catch (e) {
      console.log(e);
      setVisible(false);
    }
  };

  const search = (text) => {
    setTimeout(async () => {
      if (text) {
        try {
          setState(true);
          const data = { text };
          const response = await axiosInstance.post(`/groupChat`, data);
          console.log(response);
          setSearchData([...response.data.data]);
        } catch (e) {
          console.log(e.message);
        }
      } else if (!text) {
        setState(false);
      } else {
        setState(false);
      }
    }, 400);
  };

  const handleProps = async (group_id, group_name) => {
    try {
      const data = {
        group_id,
      };
      const response = await axiosInstance.post("/group/join", data);
      setJoinDAta(response.data.group);
      console.log(response);
      setJoinDAtaState(response.data.button_access_group);
      if (response.data.group.state == "private") {
        if (!response.data.access_group) {
          modalPrivateFunc(true);
        } else {
          props.navigation.navigate("groupChat", { name: response.data.group.group_name, group_id: response.data.group.id });
        }
      } else {
        props.navigation.navigate("groupChat", { name: group_name, group_id: group_id });
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  const accessGroup = async () => {
    try {
      const response = await axiosInstance.get(`/access/group/chat/${joinData.id}`);
    } catch (e) {
      console.log(e.response, "2");
    }
  };

  const accessGroupPublic = async () => {
    try {
      const data = {
        group_chat_id: joinData.id,
        password,
      };
      const response = await axiosInstance.post(`/access/group/chat/password`, data);
      if (response?.data?.message.status) {
        props.navigation.navigate("groupChat", { name: joinData.group_name, group_id: joinData.id });
        setModalState(false);
      }
    } catch (e) {
      console.log(e.response, "fff");
    }
  };

  return (
    <UsersContext.Provider value={props}>
      <ScrollView style={styles.usersAllView} showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={"rgb(250, 250, 250)"} barStyle={"dark-content"} />
        <InputBlue handle={search} />
        <View style={styles.container_title_view}>
          <Text style={styles.userText}>GROUPS</Text>
          <TouchableOpacity onPress={() => {
            modalFunc(true);
          }}>
            <Text style={styles.userText}> + Create Group</Text>
          </TouchableOpacity>
        </View>
        {state ? <GroupDataFunc
            handleProps={handleProps}
            data={searchData}
          />
          :
          <GroupDataFunc
            handleProps={handleProps}

            data={data}
          />}
      </ScrollView>
      <Loading loading={visible} />
      <ModalGroup
        visibleModal={visibleModal}
        modalFunc={modalFunc}
        groupNameFunc={groupNameFunc}
      />
      <PrivateModal
        joinDAtaState={joinDAtaState}
        modalState={modalState}
        modalFunc={modalPrivateFunc}
        accessGroup={accessGroup}
        setPassword={setPassword}
        setJoinDAtaState={setJoinDAtaState}
        accessGroupPublic={accessGroupPublic}
      />
    </UsersContext.Provider>
  );
}
