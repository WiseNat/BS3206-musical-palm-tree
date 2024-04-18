import Navbar from "../../../components/Navbar";
import Form from "../../../components/Form";
import SelectProgrammingLanguage from "../../../components/SelectProgrammingLanguage";
import SelectTimezone from "../../../components/SelectTimezone";
import SelectCommunicationLanguage from "../../../components/SelectCommunicationLanguage";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function Create() {
  return (
    <div>
      <Navbar />
      <main>
        <Form title="Create a Project" className="mx-16 my-4">
          {/* TODO: REQUIRED */}
          <TextField label="Project Title" />
          {/* TODO: NOT REQUIRED */}
          <TextField label="Project Description" minRows={3} multiline/>
          {/* TODO: NOT REQUIRED */}
          <SelectCommunicationLanguage label="Main Communication Language" />
          {/* TODO: NOT REQUIRED */}
          <SelectTimezone label="Main Timezone" />
          {/* TODO: NOT REQUIRED */}
          <SelectProgrammingLanguage label="Main Programming Language" />
          {/* TODO: NOT REQUIRED */}
          <SelectProgrammingLanguage label="Main Technology" />
          {/* TODO: SelectCommunicationChannel */}
          {/* TODO: TextField[Project URL] */}
          <Button variant="contained">Submit</Button>
        </Form>
      </main>
    </div>
  );
}
