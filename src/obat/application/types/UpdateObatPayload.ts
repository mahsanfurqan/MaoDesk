import CreateObatPayload from "./CreateObatPayload";

type UpdateObatPayload = Partial<Omit<CreateObatPayload, "kode">>;

export default UpdateObatPayload;
