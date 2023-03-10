import React, { lazy, useState } from "react";
import GroupDataMap from "../GroupDataMap/GroupDataMap";
import ReviewsDataMap from "../reviewsDataMap/ReviewsDataMap";
import MessagesMapData from "../messagesMapData/MessagesMapData";
import InviteDataMap from "../inviteDataMap/InviteDataMap";
import UserDataMap from "../userDataMap/UserDataMap";
import NewNotificationsMap from "../newNotificationsMap/NewNotificationsMap";
import SeAllNotificationsMap from "../seAllNotificationsMap/SeAllNotificationsMap";
import SearchUserMap from "../searchUserMap/SearchUserMap";
import LikeMap from "../likeMap/LikeMap";
import HomePagePostUserMap from "../homePagePostUserMap/HomePagePostUserMap";
import GuestMap from "../guestmap/GuestMap";
import DataChatCommentMap from "../dataChatCommentMap/DataChatCommentMap";
import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { styles } from "../../style/ChatStyle";
import MessagesMapDataSeacrh from "../MessagesMapDataSearch/MessagesMapDataSeacrh";
import Modal from "react-native-modal";
import VideoPlayer from "react-native-video-player";


export const MessagesData = [
  {
    Img: require("../../assets/image/Ellipse1.png"),
    name: "JANE",
    lastname: "OSTIN",
    description: "Lorem ipsum dolor",
  },
  {
    Img: require("../../assets/image/Ellipse1.png"),
    name: "JANE",
    lastname: "OSTIN",
    description: "Lorem ipsum dolor",
  },
  {
    Img: require("../../assets/image/Ellipse1.png"),
    name: "JANE",
    lastname: "OSTIN",
    description: "Lorem ipsum dolor",
  },
  {
    Img: require("../../assets/image/Ellipse1.png"),
    name: "JANE",
    lastname: "OSTIN",
    description: "Lorem ipsum dolor",
  },
];

export const InviteData = [
  {
    img: require("../../assets/image/Ellipse1.png"),
    Gmail: "JaneOstin@gmail.com",
  },
  {
    img: require("../../assets/image/Ellipse1.png"),
    Gmail: "JaneOstin@gmail.com",
  },
  {
    img: require("../../assets/image/Ellipse1.png"),
    Gmail: "JaneOstin@gmail.com",
  },
  {
    img: require("../../assets/image/Ellipse1.png"),
    Gmail: "JaneOstin@gmail.com",
  },
  {
    img: require("../../assets/image/Ellipse1.png"),
    Gmail: "JaneOstin@gmail.com",
  },
  {
    img: require("../../assets/image/Ellipse1.png"),
    Gmail: "JaneOstin@gmail.com",
  },
  {
    img: require("../../assets/image/Ellipse1.png"),
    Gmail: "JaneOstin@gmail.com",
  },
  {
    img: require("../../assets/image/Ellipse1.png"),
    Gmail: "JaneOstin@gmail.com",
  },
];

export const NewNotificationsData = [
  {
    imgEclipse: require("../../assets/image/Ellipse1.png"),
    name: "JANE",
    day: 2,
    lastName: "OSTIN",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    imgEclipse: require("../../assets/image/Ellipse1.png"),
    name: "JANE",
    day: 2,
    lastName: "OSTIN",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
];

export const SeAllNotificationsdata = [
  {
    imgEclipse: require("../../assets/image/Ellipse1.png"),
    name: "JANE",
    day: 2,
    lastName: "OSTIN",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    imgEclipse: require("../../assets/image/Ellipse1.png"),
    name: "JANE",
    day: 2,
    lastName: "OSTIN",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    imgEclipse: require("../../assets/image/Ellipse1.png"),
    name: "JANE",
    day: 2,
    lastName: "OSTIN",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
];
export const dataChatComment = [
  {
    text: "Look at how chocho sleep in my arms!",
    time: "16.46",
    image: require("../../assets/image/Ellipse1.png"),
  },
  {
    text: "Look at how chocho sleep in my arms!",
    time: "16.46",
    image: require("../../assets/image/Ellipse1.png"),
  },
  {
    text: "Look at how chocho sleep in my arms!",
    time: "16.46",
    image: require("../../assets/image/Ellipse1.png"),
  },
  {
    text: "Look at how chocho sleep in my arms!",
    time: "16.46",
    image: require("../../assets/image/Ellipse1.png"),
  },
];


export const DataChatCommentFunc = () => {
  return (
    dataChatComment.map((item, index) => {
      return (
        <DataChatCommentMap
          item={item}
          index={index}
          key={index}
        />
      );
    })
  );
};


export const UserDataFunc = (props) => {
  const [activePage, setActivePage] = useState(0);
  const funcActivePage = (index) => {
    setActivePage(index);
  };
  return (
    props.data.map((item, index) => {
      return (
        <UserDataMap
          item={item}
          index={index}
          key={index}
          data={props.data}
          DataFunc={props.DataFunc}
          locationFunc={props.locationFunc}
          locationText={props.locationText}
          propsNavigation={props.propsNavigation}
          funcActivePage={funcActivePage}
          funcModalLike={props.funcModalLike}
        />
      );
    })
  );
};

export const InviteDataFunc = () => {
  return (
    InviteData.map((item, index) => {
      return (
        <InviteDataMap
          item={item}
          index={index}
          key={index}
        />
      );
    })
  );
};

export const MessagesDataFunc = (props) => {
  return (
    props.search ?
      props.data.map((item, index) => {
        return (
          <MessagesMapDataSeacrh
            item={item}
            key={index}
            index={index}
          />
        );
      })
      :
      <MessagesMapData
        data={props.data}
        deleteFunc={props.deleteFunc}
      />
  );
};

export const ReviewsDataFunc = (props) => {
  const [activePage, setActivePage] = useState(0);
  const funcActivePage = (index) => {
    setActivePage(index);
  };

  return (
    props.posts.map((item, index) => {
      return (
        <ReviewsDataMap
          funcModalLike={props.funcModalLike}
          item={item}
          index={index}
          key={index}
          userid={props.userid}
          propsNavigation={props.propsNavigation}
          funcActivePage={funcActivePage}
        />
      );
    })
  );
};

export const LikeModalFunc = (props) => {

  return (
    props.likeUser.map((item, index) => {
      return (
        <LikeMap
          item={item}
          index={index}
          key={index}
          propsNavigation={props.propsNavigation}
          modalFunc={props.modalFunc}
        />
      );
    })
  );
};

export const NewNotificationsFunc = () => {
  return (
    NewNotificationsData.map((item, index) => {
      return (
        <NewNotificationsMap
          item={item}
          index={index}
          key={index}
        />
      );
    })
  );
};

export const SeAllNotificationsFunc = () => {
  return (
    SeAllNotificationsdata.map((item, index) => {
      return (
        <SeAllNotificationsMap
          item={item}
          index={index}
          key={index}
        />
      );
    })
  );
};

export const GroupDataFunc = (props) => {
  return (
    props.data.map((item, index) => {
      return (
        <GroupDataMap
          key={index}
          handle={props.handleProps}
          item={item}
          modalPrivateFunc={props.modalPrivateFunc}
          modalState={props.modalState}
          index={index}
        />
      );
    })
  );
};


export const DataProfileFunc = (props) => {
  return (
    <>
      <HomePagePostUserMap
        lazyFunc={props.lazyFunc}
        lazy={props.lazy}
        renderSongs={props.renderSongs}
        renderSongsAll={props.renderSongsAll}
        modalFuncVideo={props.modalFuncVideo}
        likeDataFunc={props.likeDataFunc}
        dataPost={props.dataPost}
        likedFuncIndex={props.likedFuncIndex}
        propsNavigation={props.propsNavigation}
        likeData={props.likeData}
        songSlider={props.songSlider}
        funcModalLike={props.funcModalLike}
        scrollX={props.scrollX}
        adver={props.adver}
        videoModal={props.videoModal}
        imageFunc={props.imageFunc}
        imageModal={props.imageModal}
        imageAnimatedDataFunc={props.imageAnimatedDataFunc}
        dataAnimated={props.dataAnimated}
      />

    </>


  );
};

export const ReplyMap = (props) => {
  const [state, setState] = useState(false);
  return (
    <View>
      {props.dataChatComment.length ?
        <TouchableOpacity
          style={{ flexDirection: "row", width: 215, alignItems: "center" }}
          onPress={() => {
            setState(!state);
          }}>
          <Text style={{
            textAlign: "left",
            fontSize: 12,
            color: "black",
          }}>Replies {props.dataChatComment ? props.dataChatComment.length : 0}</Text>
          <Image
            source={state ? require("../../assets/image/inputVector.png") : require("../../assets/image/replyVector.png")}
            style={{ marginLeft: 10, width: 15, height: 8.5, resizeMode: "contain" }}
          />
        </TouchableOpacity>
        : null}
      {state ? props.dataChatComment.map((item, index) => {
          return (
            <DataChatCommentMap
              key={index}
              item={item}
              index={index}
              propsNavigation={props.propsNavigation}
            />
          );
        })
        : null}
    </View>
  );
};

export const SearchUserFunc = (props) => {
  return (
    <>
      {props.searchDataUser ? <SearchUserMap searchDataUser={props.searchDataUser} /> : []}
      {props.searchDataPost ?
        <HomePagePostUserMap
          likeDataFunc={props.likeDataFunc}
          renderSongs={props.renderSongs}
          imageAnimatedDataFunc={props.imageAnimatedDataFunc}
          imageModal={props.imageModal}
          dataPost={props.searchDataPost}
          scrollX={props.scrollX}
          songSlider={props.songSlider}
          likedFuncIndex={props.likedFuncIndex}
          propsNavigation={props.propsNavigation}
          likeData={props.likeData}
          imageFunc={props.imageFunc}
          funcModalLike={props.funcModalLike}
          dataAnimated={props.dataAnimated}
          renderSongsAll={props.renderSongsAll}
        />
        : []}
    </>
  );
};

export const GuestFunc = (props) => {

  const [activePage, setActivePage] = useState(0);
  const funcActivePage = (index) => {
    setActivePage(index);
  };

  return (
    props.data ?
      props.data.map((item, index) => {
        return (
          <GuestMap
            item={item}
            key={index}
            index={index}
            propsNav={props.propsNav}
            funcActivePage={funcActivePage}
          />
        );
      }) : null);
};
