import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import MainHeading from "../ui/MainHeading";
import { HiOutlineUsers } from 'react-icons/hi2'
import { useDarkMode } from '../context/DarkModeContext';


function NewUsers() {
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <MainHeading isDarkMode={isDarkMode}>
        <Heading as="h1">
          <HiOutlineUsers size="31px" style={{ marginRight: '8px' }} /><span>Create a new user</span>

        </Heading>
      </MainHeading>
      <SignupForm />
    </>
  )
}

export default NewUsers;
