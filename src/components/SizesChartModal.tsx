import ModalWindow from './ModalWindow';

const tableData = [
  ['European sizes', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
  ['Russian sizes', '42', '44-46', '48', '50-52', '54-56', '58-60'],
  ['Height (cm)', '176', '176', '176-182', '182', '182', '182-188'],
  ['Chest (cm)', '84', '88-92', '96', '100-104', '108-112', '116-120'],
];

interface SizesChartModalProps {
  onClosedWindow?: () => void;
  isOpened: boolean;
}

export default function SizesChartModal({
  isOpened,
  onClosedWindow,
}: SizesChartModalProps) {
  const tableDataEl = tableData.map((row, i) => {
    return (
      <tr className={`${i === 0 ? 'font-bold' : ''}`} key={i}>
        {row.map((col, j) => {
          return (
            <td
              className={`px-6 py-3 text-center ${j === 0 ? 'font-bold' : ''}`}
              key={j}
            >
              {col}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <ModalWindow
      id="sizes-chart"
      bgClassName="flex justify-center items-center"
      windowClassName="duration-300 w-full h-full md:w-auto md:h-auto scale-[0.01] bg-surface-container-high shadow-level-3 py-7 px-6 rounded"
      addButton
      isOpened={isOpened}
      onClosedWindow={onClosedWindow}
      onBeginClosing={(node, setStyle) => {
        setStyle({
          transform: 'scale(0.01)',
        });
      }}
      onBeginOpening={(node, setStyle) => {
        setStyle({
          transform: 'scale(1)',
        });
      }}
    >
      <h1 className="mb-4 text-2xl">Sizes chart</h1>
      <h2 className="mb-3 text-lg">Outwear</h2>
      <div className="max-w-full overflow-auto">
        <table className="sizes-chart table-auto border-collapse">
          <tbody>{tableDataEl}</tbody>
        </table>
      </div>
    </ModalWindow>
  );
}
