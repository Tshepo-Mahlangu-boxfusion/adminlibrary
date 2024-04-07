// styles/styles.js

import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  main:css`
    width: 100%;
    min-height: 100vh;
    display: flex; /* Use flexbox */
    justify-content: center; /* Center items horizontally */
   
    background-color: #d3a962;
    background-position: left;
  `,
  title: css`
    marginLeft: '45%';
    color: '#fff';
  `,
  cardSpace: css`
    marginLeft: '20%';
  `,
  card: css`
    background: 'transparent';
  `,
  icon: css`
    backgroundColor: 'rgba(0,255,0,0.25)';
    borderRadius: '20px';
    fontSize: '24px';
    padding: '8px';
  `,
  tableCard: css`
    width: '200%';
    background: 'transparent';
  `,
  chartCard: css`
    width: '100%';
    marginLeft: '50%';
    background: 'transparent';
  `,
  pieChartCard: css`
    width: '95%';
    height: '200px';
    background: 'transparent';
  `,
  lineChartCard: css`
    background: 'transparent';
  `,
});
