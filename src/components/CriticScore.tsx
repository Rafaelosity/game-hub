import { Badge } from "@chakra-ui/react";

interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  // Define a mapping of scores to color schemes
  const colorScheme = score > 75 ? "green" : score > 60 ? "yellow" : "gray";

  return (
    <Badge
      paddingX={2}
      borderRadius="4px"
      fontSize="14px"
      colorScheme={colorScheme}
    >
      {score}
    </Badge>
  );
};

export default CriticScore;
