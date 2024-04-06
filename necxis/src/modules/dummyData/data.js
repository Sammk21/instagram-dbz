import React from "react";
const columns = [
  { name: "Name", uid: "name" },
  { name: "Level", uid: "level" },
  { name: "Description", uid: "description" },
  { name: "Actions", uid: "actions" },
];

const users = [
  {
    id: 1,
    name: "Java",
    level: "Hard",
    team: "Mr.haresh",
    description: "javas is hard",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Node js",
    level: "medium",
    team: "Mr.Subhash",
    description: "Node is hard",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    level: "Senior Developer",
    team: "Development",
    description: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    level: "Community Manager",
    team: "Marketing",
    description: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    level: "Sales Manager",
    team: "Sales",
    description: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
];

export { columns, users };
