document.addEventListener('DOMContentLoaded', () => {
  document.querySelector("#writeButton").addEventListener("click", async () => {
    try {
      const writer = new NDEFWriter();
      await writer.write({
        records: [{ recordType: "text", data: "Olá, Mundo NFC!" }]
      });
      alert("Escrito com sucesso!");
    } catch (error) {
      alert("Falha ao escrever na etiqueta", error);
    }
  });

  document.querySelector("#readButton").addEventListener("click", async () => {
    try {
      const reader = new NDEFReader();
      await reader.scan();

      reader.onreading = event => {
        const textRecord = event.message.records.find(record => record.recordType === "text");
        if (textRecord) {
          alert("Dados lidos:", textRecord.data);
        }
      };
    } catch (error) {
      alert("Falha ao ler a etiqueta", error);
    }
  });
});