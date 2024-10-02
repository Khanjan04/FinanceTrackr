import { useSelector } from "react-redux";

export default function Investment() {
  const title_heading = useSelector((state) => state.header.title);

  return (
    <>
      {(() => {
        switch (title_heading) {
          case "investment":
            return (
              <div>
                <h3>Investment</h3>
              </div>
            );
        }
      })()}
    </>
  );
}
