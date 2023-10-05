document.addEventListener('DOMContentLoaded', async () => {

  try {
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

    //await ndef.scan();

    document.querySelector("#writeButton").addEventListener("click", async () => {
      try {
        alert('write start');
        await ndef.scan();
        const value = document.getElementById('inputValue').value;
        await write(value);
        alert('write success');
      } catch (error) {
        alert(error);
      }
    });

    document.querySelector("#readButton").addEventListener("click", async () => {
      try {
        alert('read start');
        await ndef.scan();
        await read();
      } catch (error) {
        alert(error);
      }
    });
  } catch (error) {
    alert(error);
  }
});
