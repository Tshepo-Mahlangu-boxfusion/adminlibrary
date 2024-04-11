'use client'
import React, { useState } from 'react';
import { Button } from 'antd'; // Assuming you're using Ant Design for the Button component
import AddBooks from '../../../../components/addBook/page';
import ManageBooks from '../../../../components/manageBooks/page';

const Book = () => {
  const [showDiv, setShowDiv] = useState(false);

  return (
    <div>
     <ManageBooks />
    </div>
  );
};

export default Book;
