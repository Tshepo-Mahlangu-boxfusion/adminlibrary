import { createStyles ,css} from "antd-style";

export const useStyles=createStyles({
    container:css`
        width:300px;
    `,
    layout:css` 
    minHeight: '100vh' 
    `,
    content:css`
    margin: '0 16px';
    padding: 24;
    minHeight: 360;
    
    `
})