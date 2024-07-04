import React, { memo } from 'react'
import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { usePassword } from '../../../context/AppContext';

const DataTable = () => {

    const { userData, deleteRecord, setIsUpdate, updateCurrentFormData } = usePassword();

    const handleUpdate = (record) => {
        window.scrollTo({ top: 0 })
        setIsUpdate(true);
        updateCurrentFormData(record);
    }

    return (
        <div className="overflow-auto rounded-lg border border-gray-200  shadow-md mt-9">
            <table className=" w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50 uppercase font-semibold">
                    <tr>
                        <th key={1} className="px-6 py-4 font-medium text-gray-900">Rows</th>
                        <th key={2} className="px-6 py-4 font-medium text-gray-900">AppName</th>
                        <th key={3} className="px-6 py-4 font-medium text-gray-900">UserName/Email</th>
                        <th key={4} className="px-6 py-4 font-medium text-gray-900">PassWord</th>
                    </tr>
                </thead>
                {userData.length != 0 ? (

                    userData.map((record, index) =>
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                                <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4">
                                    {record.appName}
                                </td>
                                <td className="px-6 py-4">{record.appUserName}</td>
                                <td className="px-6 py-4">
                                    <span className="flex gap-4 items-center">
                                        {record.appUserPassword}
                                        <FaRegEdit onClick={() => handleUpdate(record)} className="text-lg cursor-pointer active:text-blue-500" />
                                        <FaTrash onClick={() => deleteRecord(record._id)} className="text-lg cursor-pointer active:text-red-500" />
                                    </span>
                                </td>
                            </tr>
                        </tbody>)
                ) : (
                    <tfoot className="font-semibold text-3xl mt-9 tracking-wide w-full">
                        <td colSpan={4} className="text-center py-12">You haven't Stored Any Passwords Yet!</td>
                    </tfoot>
                )}
            </table>
        </div>

    )
}

export default memo(DataTable)
