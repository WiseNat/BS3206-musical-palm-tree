import Navbar from "@/app/components/Navbar";
import Form from "@/app/components/Form";
import SelectProgrammingLanguage from "@/app/components/SelectProgrammingLanguage";
import SelectTimezone from "@/app/components/SelectTimezone";
import SelectCommunicationLanguage from "@/app/components/SelectCommunicationLanguage";
import SelectTechnology from "@/app/components/SelectTechnology";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function Create() {
  return (
    <div>
      <Navbar />
      <main>
        <Form title="Create a Project" className="mx-16 my-4">
          <TextField label="Project Title" required />
          <TextField label="Project Description" minRows={3} multiline/>
          <SelectCommunicationLanguage label="Main Communication Language" required />
          <SelectTimezone label="Main Timezone" />
          <SelectProgrammingLanguage label="Main Programming Language" />
          <SelectTechnology label="Main Technology" />
          {/* TODO: SelectCommunicationChannel */}
          {/* TODO: TextField[Project URL] */}
          <Button variant="contained">Submit</Button>
        </Form>
      </main>
    </div>
  );
}
