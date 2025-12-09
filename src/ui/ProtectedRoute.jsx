import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display:flex;
    align-items: center;
    justify-content: center;
`
// ... existing imports ...
function ProtectedRoute({ children }) {
    // BYPASS authentication: always render children
    return children;
  }
  
  export default ProtectedRoute;