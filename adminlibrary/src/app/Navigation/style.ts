import { createStyles ,css} from "antd-style";

export const useStyles=createStyles({
    side:css`
    background-color:#873e23 ;
    height:100vh;
    overflow:hidden;
    
    `,
    
    layout:css` 
    minHeight: '100vh' 
    `,
    content:css`
    margin: '0 16px';
    padding: 24;
    minHeight: 360;
    `,
    list: css`
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center; 
    width:100%;
    background-color:#873e23 !important;
    
    `,
    items:css`
    color: #fff;
    display: flex;
    justify-content: flex-start !important; 
    align-items: center;
    height: 60px; 
    text-decoration: none;
    box-sizing: border-box;
    transition: 0.5s;
    transition-property: background;
    &:hover{
      background: #d3a962;
      
    }
    `,
    logoutButton: css`
    transition: color 0.3s ease;
    background:'transparent';
    color:#000;
    margin-bottom:10px;
    
  `, 
  configButton: css`
    transition: color 0.3s ease;
    background-color:'transparent';
    color:#000;
  `,
  ContainerButton: css`  
    margin-bottom: 20px;
    transition: color 0.3s ease;
    position:absolute;
    justify-content:center;
    width:100%;
    bottom:0;
    display: flex;
    flex-direction: column;
  `,       
      

})