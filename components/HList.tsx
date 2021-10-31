import React from "react";
import { FlatList, NativeSyntheticEvent } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 20px;
`;

export const HListSeperator = styled.View`
  width: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

interface HListProps {
  title: string;
  data: any[];
}

const HList: React.FC<HListProps> = ({ title, data }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 30 }}
        ItemSeparatorComponent={HListSeperator}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        data={data}
        horizontal
        renderItem={({ item }) => {
          return (
            <VMedia
              posterPath={item.poster_path}
              originalTitle={item.original_title ?? item.original_name}
              voteAverage={item.vote_average}
            />
          );
        }}
      />
    </ListContainer>
  );
};
export default HList;
