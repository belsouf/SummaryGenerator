import React from "react";
import { Flex, Input, Button, Text } from "@chakra-ui/react";

function Chapter({
  data,
  order,
  addChapterHandler,
  changeHandler,
  deleteHandler
}) {
  return (
    <Flex flexDir="column" mb="30px">
      <Flex alignItems="center">
        <Button
          w="30px"
          h="30px"
          size="sm"
          colorScheme="red"
          variant="outline"
          borderRadius="100%"
          mt="10px"
          onClick={() => deleteHandler(data.id)}
        >
          -
        </Button>
        <Text fontSize="20px" ml="10px">
          {order}
        </Text>
        <Input
          type="text"
          placeholder="Chapitre"
          ml="6px"
          w="500px"
          onChange={(e) =>
            changeHandler(data.id, {
              title: e.target.value,
              h_volume: data.h_volume
            })
          }
        />
        <Input
          type="number"
          placeholder="Volume horaire"
          ml="6px"
          w="300px"
          onChange={(e) =>
            changeHandler(data.id, {
              title: data.title,
              h_volume: e.target.value
            })
          }
        />
      </Flex>
      <Flex pl="100px" flexDir="column">
        {data.childs &&
          data.childs.map((chapter, i) => (
            <Flex mt="10px" flexDir="column" key={i}>
              <Chapter
                data={chapter}
                order={order + (i + 1).toString() + ". "}
                addChapterHandler={addChapterHandler}
                changeHandler={changeHandler}
                deleteHandler={deleteHandler}
              />
            </Flex>
          ))}
        <Button
          w="30px"
          h="30px"
          size="sm"
          colorScheme="teal"
          variant="outline"
          borderRadius="100%"
          mt="10px"
          onClick={() => addChapterHandler(data.id)}
        >
          +
        </Button>
      </Flex>
    </Flex>
  );
}

export default Chapter;
