import FileInput from "@/components/FileInput.js";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
  Switch,
} from "@material-tailwind/react";
import { useState } from "react";

const RegiterProductModal = () => {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // const filesToSend = files.map((f) => ({
    //   type: f.type,
    //   name: f.name,
    //   size: f.size,
    // }));

    // savePetRequest
    //   .send({ ...formData, files: filesToSend })
    //   .then(async ({ data }) => {
    //     const imageUrls = data.imageUrls;
    //     await Promise.all(
    //       imageUrls.map((url, i) => {
    //         const images = files[i];
    //         return axios.put(url, images);
    //       })
    //     );
    //     console.log('redirect')
    //   });
    console.log("submited");
  };

  return (
    <>
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <div className="flex items-center">
              <Typography variant="h3" color="white">
                Cadastro
              </Typography>
              <img src="./shopping-bags-undraw.svg" className="h-24 p-2" />
            </div>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <FileInput limit={3} onChange={setFiles} />
            <Input onChange={handleChange} name="name" label="Nome" size="lg" />
            <Input
              onChange={handleChange}
              name="description"
              label="Descrição"
              size="lg"
            />
            <Input
              onChange={handleChange}
              name="price"
              label="Preço Ex: 100,00"
              size="lg"
            />
            <Select onChange={handleSelectChange("category")} label="Categoria">
              <Option value="electronics">Eletrônicos</Option>
              <Option value="clothes">Vestuários</Option>
              <Option value="foods">Alimentos</Option>
              <Option value="home">Para casa</Option>
              <Option value="other">Outro</Option>
            </Select>
            <Select onChange={handleSelectChange("size")} label="Tamanho">
              <Option value="small">Pequêno</Option>
              <Option value="medium">Médio</Option>
              <Option value="large">Grande</Option>
            </Select>
            <Switch
              id="active"
              name="active"
              onChange={handleChange}
              label="Embalagem para presente"
            />
            <div className="-ml-2.5"></div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit}>
              Cadastrar
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Ja tem um produto cadastrado?
              <Typography
                as="span"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                Ver produtos
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default RegiterProductModal;
