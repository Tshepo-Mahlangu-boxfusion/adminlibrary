import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
    main:css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 6rem;
    min-height: 100vh;
    `,  
    cardBox:css`
        position: relative;
        padding: 20px;
        display: grid;
        grid-template-columns: repeat(4,1fr);
        grid-gap: 30px;
        overflow: hidden;
    `
    
        // .cardBox .card {
        //     position: relative;
        //     background: #fff;
        //     padding: 30px;
        //     border-radius: 20px;
        //     display: flex;
        //     justify-content: space-between;
        //     cursor: pointer;
        //     box-shadow: 0 7px 25px rgba(0,0,0,0.08);
        // }
    
        //     .cardBox .card .numbers {
        //         position: relative;
        //         font-weight: 500;
        //         font-size: 2.5em;
        //         color: #1983D3;
        //     }
    
        //     .cardBox .card .cardName {
        //         font-size: 1.1em;
        //         margin-top: 5px;
        //         color: #000000;
        //     }
    
        //     .cardBox .card .iconBx {
        //         font-size: 2.5em;
        //         color: #444;
        //     }
    
        //     .cardBox .card:hover {
        //         background: #1983D3;
        //     }
    
        //         .cardBox .card:hover .numbers,
        //         .cardBox .card:hover .cardName,
        //         .cardBox .card:hover .iconBx {
        //             color: #fff;
        //         }
      
})
