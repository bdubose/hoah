import styles from './Grid.module.css';
import { ReactElement } from "react";

interface ColumnConfig<T> {
  title: string,
  value: (entity: T) => string | number | ReactElement | undefined
}

interface GridProps<T> {
  entities: T[],
  config: ColumnConfig<T>[],
}
export function Grid<T>({ entities, config }: GridProps<T>) {
  return (
      <table className={styles.grid}>
        <thead>
        <tr>
          { config.map((col, i) =>
              <th key={i} className={styles.th}>
                {col.title}
              </th>
          )}
        </tr>
        </thead>
        <tbody>
        { entities.map((row, i) =>
          <tr key={i} className={styles.row}>
            {config.map((col, i) =>
                <td key={i} className={styles.cell}>
                  {col.value(row)}
                </td>)}
          </tr>
        )}
        </tbody>
      </table>
  )
}