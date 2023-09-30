document.addEventListener('DOMContentLoaded', () => {
  document.querySelector("#writeButton").addEventListener("click", async () => {
    try {
      const writer = new NDEFWriter();
      await writer.write({
        records: [{ recordType: "text", data: "Olá, Mundo NFC!" }]
      });
      alert("Escrito com sucesso!");
    } catch (error) {
      alert(error);
    }
  });

  document.querySelector("#readButton").addEventListener("click", async () => {
    try {
      alert('aki 1');
      const reader = new NDEFReader();
      alert('aki 2');
      await reader.scan();
      alert('aki 3');
      reader.onreading = event => {
        alert('aki 4');
        const textRecord = event.message.records.find(record => record.recordType === "text");
        alert('aki 5');
        if (textRecord) {
          alert('aki 6');
          alert("Dados lidos:", textRecord.data);
        }
        alert('aki 7');
      };
    } catch (error) {
      alert(error);
    }
  });
});