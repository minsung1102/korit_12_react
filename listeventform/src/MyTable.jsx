export default function MyTable() {
    const data = [
        {id: 1, brand: '현대', modle: '그랜저'},
        {id: 2, brand: '기아', modle: '셀토스'},
        {id: 3, brand: '람보르기니', modle: '우라칸'}
    ];

    return(
        <>
            <table>
                <tbody>
                    {
                        data.map(car => <tr key={car.id}>
                            <td>{car.brand}</td>
                            <td>{car.modle}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </>
    );
}