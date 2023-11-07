import React, { useEffect, useState } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useSnackbar } from "notistack";
import "./editor.css";
import socket from "../../APIs/Websocket";

interface MouseComponentProps {
  clientX: number;
  clientY: number;
  name: string;
}

const MouseComponent = (props: MouseComponentProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top: props.clientY,
        left: props.clientX,
      }}
    >
      <div className="custom-cursor" style={{ borderBottomColor: "red" }}></div>
      <span style={{ color: "red" }} className="name-under-cursor">
        {props.name}
      </span>
    </div>
  );
};
const usernameArr = ["hruthvik", "hruthvik2", "hruthvik3"];
const username = usernameArr[Math.floor(Math.random() * usernameArr.length)];
type FileMeta = {
  [key: string]: {
    name: string;
    language: string;
    value: string;
  };
};

type langObjMeta = {
  [key: string]: string;
};
const files: FileMeta = {
  "script.js": {
    name: "script.js",
    language: "javascript",
    value: "",
  },
};
function Editor() {
  const { enqueueSnackbar } = useSnackbar();
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [filename, setFilename] = useState("script.js");
  const [fileMeta, setFileMeta] = useState(files);
  const [newFileName, setNewFileName] = useState("");
  const [mouseMovement, setMouseMovement] = useState<
    {
      clientX: number;
      clientY: number;
      name: string;
    }[]
  >([]);

  //
  //* connect to web socket and other websocket operatons
  useEffect(() => {
    socket.onopen = () => {
      console.log("websocket connection opened");
    };
    //listen to the messages received
    socket.onmessage = (event) => {
      console.log("this is runnning");
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        console.log("websocket is running ");
        reader.onload = () => {
          if (typeof reader.result === "string") {
            console.log(JSON.parse(reader.result));
            const res = JSON.parse(reader.result);
            setMouseMovement((prevPositions) => {
              // Check if the user has a position already
              const userIndex: number = prevPositions?.findIndex(
                (position) => position?.name === username
              );

              if (userIndex !== -1) {
                // Update the user's position
                prevPositions[userIndex] = {
                  name: res.name,
                  clientX: res.clientX,
                  clientY: res.clientY,
                };
                return [...prevPositions];
              } else {
                // Add a new user position
                return [
                  ...prevPositions,
                  {
                    name: username,
                    clientX: res.clientX,
                    clientY: res.clientY,
                  },
                ];
              }
            });
          }
        };
        // reader.readAsText(event.data);
      } else {
        console.log("Result" + JSON.stringify(event.data));
      }
    };
  }, []);

  const handleCreateNewFile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(fileMeta).includes(newFileName)) {
      enqueueSnackbar("File already exists", { variant: "warning" });
      return;
    }

    let lang = newFileName.split(".")[1];
    if (lang === undefined) {
      enqueueSnackbar("Invalid file name", { variant: "warning" });
      return;
    }
    let langObj: langObjMeta = {
      js: "javascript",
      py: "python",
      java: "java",
      ts: "typescript",
    };
    const file = {
      name: newFileName,
      language: langObj[lang],
      value: "",
    };
    setFileMeta({
      ...fileMeta,
      [newFileName]: file,
    });

    enqueueSnackbar("successfully created file", { variant: "success" });
  };
  const handleFileSelect = (filename: string) => {
    setFilename(filename);
  };

  //*send mouse events to websocket
  const handleMouseMove = (e: React.MouseEvent) => {
    if (socket.readyState === WebSocket.OPEN) {
      // console.log(
      //   JSON.stringify({
      //     clientX: e.clientX,
      //     clientY: e.clientY,
      //     name: username,
      //   })
      // );
      socket.send(
        JSON.stringify({
          clientX: e.clientX,
          clientY: e.clientY,
          name: username,
        })
      );
    } else {
      console.error("WebSocket connection is not open.");
    }
  };

  return (
    <div style={{ padding: "10px" }} onMouseMove={handleMouseMove}>
      {mouseMovement?.map((item, index) => {
        console.log(item);
        return (
          <MouseComponent
            key={index}
            clientX={item.clientX}
            clientY={item.clientY}
            name={item.name}
          />
        );
      })}

      <form onSubmit={handleCreateNewFile}>
        <input
          type="text"
          placeholder="filename"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewFileName(e.target.value);
          }}
        />
        <button type="submit">create</button>
      </form>
      <span>
        {Object.keys(fileMeta).map((item: string, index: number) => {
          return (
            <button
              key={index}
              onClick={() => handleFileSelect(item)}
              style={{ color: item === filename ? "red" : "" }}
            >
              {fileMeta[item].name}
            </button>
          );
        })}
      </span>
      <MonacoEditor
        height={"70vh"}
        width={"100%"}
        theme={theme} //for background theme
        language={language} //selected language
        path={fileMeta[filename].name} //current script name from filesMeta object
        defaultValue={fileMeta[filename].value}
      />
    </div>
  );
}

export default Editor;
