import React, { useEffect, useState } from "react";
import { Flex, Input, Button, Text } from "@chakra-ui/react";
import Chapter from "./Chapter";
import { v4 as uuidv4 } from "uuid";

function Test() {
  const [data, setData] = useState([]);

  const [totalHVolume, setTotalHVolume] = useState(0);

  const addChild = (chapters, id, newChild): any => {
    for (const chapter of chapters) {
      if (chapter.id === id) {
        chapter.childs = [...chapter.childs, newChild];
      } else addChild(chapter.childs, id, newChild);
    }
  };

  const editChild = (chapters, id, newData): any => {
    for (const chapter of chapters) {
      if (chapter.id === id) {
        if (chapter.h_volume !== newData.h_volume)
          setTotalHVolume(
            totalHVolume -
              chapter.h_volume +
              (newData.h_volume !== "" ? parseInt(newData.h_volume) : 0)
          );
        chapter.title = newData.title;
        chapter.h_volume = newData.h_volume;
      } else editChild(chapter.childs, id, newData);
    }
  };

  const deleteChild = (chapters, id): any => {
    for (const [i, chapter] of chapters.entries()) {
      if (chapter.id === id) {
        chapters.splice(i, 1);
        setTotalHVolume(totalHVolume - chapter.h_volume);
        break;
      } else deleteChild(chapter.childs, id);
    }
  };

  const addChapterHandler = (parentId = null) => {
    let dataCopy = [...data];
    const newChild = {
      id: uuidv4(),
      parent: null,
      title: "",
      h_volume: 0,
      childs: []
    };
    if (parentId) {
      addChild(dataCopy, parentId, { ...newChild, parent: parentId });
      setData(dataCopy);
    } else setData([...data, newChild]);
  };

  const changeHandler = (chapterId, newData) => {
    let dataCopy = [...data];
    editChild(dataCopy, chapterId, newData);
    setData(dataCopy);
  };

  const deleteHandler = (chapterId) => {
    let dataCopy = [...data];
    deleteChild(dataCopy, chapterId);
    setData(dataCopy);
  };

  useEffect(() => {
    console.log("UseEffect: ", data);
  }, [data]);

  const order = "";

  return (
    <Flex flexDir="column" p="10px">
      <Flex mb="10px">
        <Text fontWeight="bold">Total Volume horaire:</Text>{" "}
        <Text ml="8px">{totalHVolume}h</Text>
      </Flex>
      {data.map((chapter, i) => (
        <Chapter
          data={chapter}
          key={i}
          order={order + (i + 1) + ". "}
          addChapterHandler={addChapterHandler}
          changeHandler={changeHandler}
          deleteHandler={deleteHandler}
        />
      ))}
      <Button
        w="30px"
        h="30px"
        size="sm"
        colorScheme="teal"
        variant="outline"
        borderRadius="100%"
        mt="10px"
        onClick={() => addChapterHandler()}
      >
        +
      </Button>
    </Flex>
  );
}

export default Test;
