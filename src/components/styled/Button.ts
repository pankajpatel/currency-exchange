import styled from "styled-components";

const getClassNames = (type?: string): string => {
  switch (type) {
    case "outline":
      return "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
    default:
      return "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  }
};

type Props = {
  type?: string;
};

export const Button = styled.button.attrs((props: Props) => ({
  className: getClassNames(props.type),
}))``;
