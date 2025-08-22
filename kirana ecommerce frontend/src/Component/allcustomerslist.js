import React, { useEffect, useState } from "react";
import { Table, InputGroup, FormControl, Pagination, Spinner, Container, Row, Col, Breadcrumb } from "react-bootstrap";
import api from "./api"; // your axios instance
import Sidebar from "./sidebar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function CustomerList() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  // For search/filter
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  // Fetch customers
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await api.get("api/user/getusers");
      setCustomers(response.data.user);
    } catch (error) {
      console.error("Failed to fetch customers", error);
      // You may wish to add error notification here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filtered customers based on search
  const filteredCustomers = customers?.filter(customer => {
    const searchable = (customer.name + " " + customer.email).toLowerCase();
    return searchable.includes(searchTerm.toLowerCase());
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirst, indexOfLast);

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="content flex-grow-1 p-4" style={{ marginTop: "-50px" }}>
        <div className="body-content px-4 py-4" style={{ backgroundColor: "#f1f5f9", minHeight: "100vh" }}>
          <Row className="mb-3 align-items-center">
            <Col>
              <Header />
              <Breadcrumb>
                <Breadcrumb.Item onClick={() => navigate("/Dashboard")} style={{ cursor: "pointer" }}>Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Customers</Breadcrumb.Item>
              </Breadcrumb>
              <h3 className="mb-3">Customer List</h3>
            </Col>

            <Col md={4}>
              <InputGroup>
                <FormControl
                  placeholder="Search customers by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <InputGroup.Text>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>

          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <p className="text-center text-muted mt-5 fs-5">No customers found.</p>
          ) : (
            <>
              <Table bordered hover responsive style={{ backgroundColor: "white" }} className="shadow-sm">
                <thead style={{ backgroundColor: "#4F46E5", color: "white" }}>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>Pincode</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.map((cust) => (
                    <tr key={cust._id}>
                      <td>{cust.name}</td>
                      <td>{cust.email}</td>
                      <td>{cust.phone || "-"}</td>
                      <td>
                        {[cust.houseNo, cust.address, cust.landmark]
                          .filter(Boolean)
                          .join(", ") || "-"}
                      </td>
                      <td>{cust.city || "-"}</td>
                      <td>{cust.state || "-"}</td>
                      <td>{cust.country || "-"}</td>
                      <td>{cust.pincode || "-"}</td>
                      <td>{cust.createdAt ? new Date(cust.createdAt).toLocaleDateString() : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {totalPages > 1 && (
                <Pagination className="justify-content-center">
                  <Pagination.Prev onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} />
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </Pagination.Item>
                    );
                  })}
                  <Pagination.Next onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} />
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerList;
