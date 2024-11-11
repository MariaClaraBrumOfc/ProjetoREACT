import styled from "styled-components";
/* Elemento de botão personalizado com CSS */
const SButton = styled.button`
cursor: pointer;
padding: 18px Spx;
midth: 100%;
color: sFFFFFF;
background-color: t900080;
font-size: 18px;
| border: 6;
border-radius: 8px;
`;

/**
* Componente de botão
* @param {HTMLCOLLection} children Elementos internos
* @param {Function} onClick Função ao clicar
* @param {Boolean} isLoading Status de loading
*/

function Button({ children, onClick, isLoading = false }) {
return (
<SButton onCLick={onClick} disabled={isLoading}>
{isLoading ? "Carregando..." : children}
</SButton>
);
}
export default Button;
