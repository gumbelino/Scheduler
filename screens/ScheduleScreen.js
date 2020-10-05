import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Banner from "../components/Banner";
import CourseList from "../components/CourseList";
import CourseEditScreen from "./CourseEditScreen";
import UserContext from "../UserContext";
import { firebase } from "../firebase";

const schedule = {
  title: "CS Courses for 2018-2019",
  courses: [
    {
      id: "F101",
      title: "Computer Science: Concepts, Philosophy, and Connections",
      meets: "MWF 11:00-11:50",
    },
    {
      id: "F110",
      title: "Intro Programming for non-majors",
      meets: "MWF 10:00-10:50",
    },
    {
      id: "F111",
      title: "Fundamentals of Computer Programming I",
      meets: "MWF 13:00-13:50",
    },
    {
      id: "F211",
      title: "Fundamentals of Computer Programming II",
      meets: "TuTh 12:30-13:50",
    },
  ],
};

const fixCourses = (json) => ({
  ...json,
  courses: Object.values(json.courses),
});

const ScheduleScreen = ({ navigation }) => {
  const [schedule, setSchedule] = useState({ title: "", courses: [] });

  const user = useContext(UserContext);
  const canEdit = user && user.role === "admin";

  const view = (course) => {
    navigation.navigate(canEdit ? "CourseEditScreen" : "CourseDetailScreen", {
      course,
    });
  };

  useEffect(() => {
    const db = firebase.database().ref();
    const handleData = (snap) => {
      if (snap.val()) setSchedule(fixCourses(snap.val()));
    };
    db.on("value", handleData, (error) => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Banner title={schedule.title} />
      <CourseList view={view} courses={schedule.courses} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
});

export default ScheduleScreen;
