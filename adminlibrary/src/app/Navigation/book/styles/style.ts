import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
    main:css`
    width:100%;
    min-height: 100vh;
    background: url(/assets/img/Shelf.png) no-repeat center center;
    background-color:#d3a962;
    background-position: left;
    padding:40px;
    `, 
    container:css`
    width: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
    font-family: 'Poppins', sans-serif;
    ` ,
    table:css`
    width:60%;
    position:relative;
    top: 50%;
    left: 40%;
    backdrop-filter: blur(1px) !important;
    `,
    tableContainer:css`
     width:80%;
    `,
    button:css`
    position:relative;
    top: 50%;
    left: 40%;
    background-color:#873e23;
    &:hover{
        background-color:#873e23 !important;
        border:2px solid #d3a962;
    }`
})
