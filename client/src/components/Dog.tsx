export default function Dog({dog}: {dog: Dog}) {
  return (
    <div
      key={dog.id}
      className="bg-white shadow-md rounded-2xl p-4 border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-1">{dog.nome}</h2>
      <p className="text-gray-600">Raça: {dog.raca}</p>
      <p className="text-gray-600">Idade: {dog.idade} ano(s)</p>
      <p className="text-gray-600">Peso: {dog.pesoKg} kg</p>
      <div className="mt-2">
        <span className="font-medium">Vacinas:</span>
        <ul className="list-disc ml-5 text-sm text-gray-700">
          {dog.vacinas.map((vacina, index) => (
            <li key={index}>{vacina}</li>
          ))}
        </ul>
      </div>
      <div className="mt-3 text-sm text-gray-500">
        <p>
          <strong>Dono:</strong> {dog.dono.nome}
        </p>
        <p>
          <strong>Contato:</strong> {dog.dono.telefone}
        </p>
      </div>
    </div>
  );
}
