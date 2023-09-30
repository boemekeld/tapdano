document.addEventListener('DOMContentLoaded', async () => {

  const ndef = new NDEFReader();

  function write(data) {
    return new Promise((resolve, reject) => {
      ndef.addEventListener(
        "reading",
        (event) => {
          ndef
            .write(data)
            .then(resolve, reject)
            .finally(() => (ignoreRead = false));
        },
        { once: true },
      );
    });
  }

  function read() {
    return new Promise((resolve, reject) => {
      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        try {
          //alert(`> Records: (${message.records.length})`);
          for (const record of message.records) {
            const decoder = new TextDecoder();
            //alert(`Record type:  ${record.recordType}`);
            //alert(`MIME type:    ${record.mediaType}`);
            //alert(`Record id:    ${record.id}`);
            alert(serialNumber + ':' + decoder.decode(record.data));
          }
          //alert(JSON.stringify(serialNumber));
          resolve();
        } catch (error) {
          reject(error);
        }
      },
      { once: true }
      );
    });
  }

  await ndef.scan();

  document.querySelector("#writeButton").addEventListener("click", async () => {
    try {
      const value = document.getElementById('inputValue').value;
      await write(value);
      alert('write success');
    } catch (error) {
      alert(error);
    }
  });

  document.querySelector("#readButton").addEventListener("click", async () => {
    try {
      await read();
    } catch (error) {
      alert(error);
    }
  });
});