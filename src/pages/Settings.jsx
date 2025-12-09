import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import MainHeading from "../ui/MainHeading";
import Row from "../ui/Row"
import { HiOutlineCog6Tooth } from 'react-icons/hi2'
import { useDarkMode } from '../context/DarkModeContext';


function Settings() {
  const { isDarkMode } = useDarkMode();
  return (
    <Row>
      <MainHeading isDarkMode={isDarkMode}>
        <Heading as="h1">
          <HiOutlineCog6Tooth size="31px" /><span>Update hotel settings</span>
        </Heading>
      </MainHeading>
      <UpdateSettingsForm />
    </Row>
  )
}

export default Settings;
