// styled-component
import styled from "styled-components";


export const Title = styled.h1`
  color: #255b80;
  text-align: center;
  font-size: 2.5rem;
  margin-top: 60px;
  margin-bottom: 32px;
`;

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 20px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ChartBox = styled.div`
  flex: 1.25;
  min-width: 400px;

  @media (max-width: 900px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;



export const SummaryBox = styled.div`
  flex: 0.6;
  min-width: 220px;
  margin-top: 48px;
  margin-right: 60px;
  padding: 60px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: transparent;

  .summary-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
    text-align: left;
  }

  .category-breakdown {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }

  .category-row {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }

  .category-name {
    font-weight: 500;
  }

  .category-amount {
    font-weight: 500;
  }

  .divider {
    border: none;
    border-top: 1px solid #ddd;
    margin: 16px 0;
  }

  .summary-totals {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }

  .summary-row.bold {
    font-weight: bold;
  }
`;

