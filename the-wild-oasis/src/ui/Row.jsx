import styled, { css } from "styled-components";


const Row = styled.div`
    display: flex;
    
    ${props => props.type === 'horizontal' && css`
        justify-content: space-around;
        align-content: center;
    `}

    ${props => props.type === 'vartical' && css`
        flex-direction: column;
        gap: 10px;
    `}
`

Row.defaultProps = {
  type: 'vartical'
}


export default Row;