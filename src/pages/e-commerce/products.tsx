/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  Textarea,
  TextInput,
  Alert,
  Dropdown,
} from "flowbite-react";
import type { FC } from "react";
import { useState, useEffect, ChangeEvent } from "react";
import { FaPlus } from "react-icons/fa";
import {
  HiCog,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiPencilAlt,
  HiTrash,
  HiUpload,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import axios from "axios";
import { FaAngleDown } from "react-icons/fa";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail?: string;
  status: number;
}

const EcommerceProductsPage: FC = function () {
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/e-commerce/products">
                E-commerce
              </Breadcrumb.Item>
              <Breadcrumb.Item>Products</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All products
            </h1>
          </div>
          <div className="block items-center sm:flex">
            <SearchForProducts />
            <div className="hidden space-x-1 border-l border-gray-100 pl-2 dark:border-gray-700 md:flex">
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Configure</span>
                <HiCog className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Delete</span>
                <HiTrash className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Purge</span>
                <HiExclamationCircle className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Settings</span>
                <HiDotsVertical className="text-2xl" />
              </a>
            </div>
            <div className="flex w-full items-center sm:justify-end">
              <AddProductModal />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <ProductsTable />
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

const SearchForProducts: FC = function () {
  return (
    <form className="mb-4 sm:mb-0 sm:pr-3" action="#" method="GET">
      <Label htmlFor="products-search" className="sr-only">
        Search
      </Label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        <TextInput
          id="products-search"
          name="products-search"
          placeholder="Search for products"
        />
      </div>
    </form>
  );
};

const AddProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);
  const [nameProduct, setNameProduct] = useState("");
  const [cateProduct, setCateProduct] = useState("");
  const [quantityProduct, setQuantity] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [authorProduct, setAuthorProduct] = useState("");
  const [desctiptionProduct, setDescriptionProduct] = useState("");
  const [permission, setPermission] = useState(false);

  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };
  const handleUploadClick = () => {
    if (!fileList) {
      return;
    }
    if (fileList.length > 5) {
      alert("Chỉ được tải lên 5 ảnh là tối đa");
      return;
    }
    let formData = new FormData();
    formData.append("name", nameProduct);
    formData.append("category", cateProduct);
    formData.append("quantity", quantityProduct);
    formData.append("author", "5");
    formData.append("price", priceProduct);
    formData.append("description", desctiptionProduct);
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file) {
        formData.append(`image${i + 1}`, file);
      }
    }
    axios
      .post(
        "http://localhost/WriteResfulAPIPHP/admin/product/addProduct.php",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        if (res.data.success == true) {
          setOpen(false);
          alert(res.data.message);
        }
      });
  };

  const files = fileList ? [...fileList] : [];

  return (
    <div>
      <Button
        color="primary"
        onClick={() => {
          if (
            localStorage.getItem("id") == "2" ||
            localStorage.getItem("id") == "" ||
            localStorage.getItem("id") == "4"
          ) {
            setPermission(false);
            setOpen(!isOpen);
          } else {
            setPermission(true);
          }
        }}
      >
        <FaPlus className="mr-3 text-sm" />
        Add product
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700 mt-40">
          <strong>Add product</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="productName">Product name</Label>
                <TextInput
                  id="productName"
                  name="productName"
                  placeholder='Truyện gì đó ...."'
                  className="mt-1"
                  onChange={(e) => {
                    setNameProduct(e.target.value);
                  }}
                  value={nameProduct}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  className="border-slate-400 rounded"
                  name="category"
                  id=""
                  onChange={(e) => {
                    setCateProduct(e.target.value);
                  }}
                >
                  <option value="0" selected>
                    Chọn loại truyện
                  </option>
                  <option value="1" selected>
                    Truyện tranh Việt Nam
                  </option>
                  <option value="2" selected>
                    Truyện tranh nước ngoài
                  </option>
                  <option value="3" selected>
                    Chọn loại truyện
                  </option>
                </select>
              </div>
              <div>
                <Label htmlFor="brand">Quantity</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder="Số lượng"
                  className="mt-1"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                  value={quantityProduct}
                />
              </div>
              <div></div>
              <div>
                <Label htmlFor="brand">Author</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder="Của tác giả nào"
                  className="mt-1"
                  onChange={(e) => {
                    setAuthorProduct(e.target.value);
                  }}
                  value={authorProduct}
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Giá bán lẻ"
                  className="mt-1"
                  onChange={(e) => {
                    setPriceProduct(e.target.value);
                  }}
                  value={priceProduct}
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="producTable.Celletails">Product details</Label>
                <Textarea
                  id="producTable.Celletails"
                  name="producTable.Celletails"
                  placeholder="Thêm nhưng thông tin liên quan cho sản phẩm"
                  rows={6}
                  className="mt-1"
                  onChange={(e) => {
                    setDescriptionProduct(e.target.value);
                  }}
                  value={desctiptionProduct}
                />
              </div>
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                        Thêm ảnh làm thumbnail cho sản phẩm
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      multiple
                    />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={handleUploadClick}>
            Add product
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={permission} onClose={() => setPermission(false)}>
        <Modal.Header>Tài khoản không đủ quyền</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p>Tài khoản cuả bạn không đủ quyền để truy cập phần này</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setPermission(false)}>I accept</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const EditProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);
  const [nameProduct, setNameProduct] = useState("");
  const [quantityProduct, setQuantity] = useState("");
  const [cateProduct, setCateProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [authorProduct, setAuthorProduct] = useState("");
  const [desctiptionProduct, setDescriptionProduct] = useState("");
  const [permission, setPermission] = useState(false);

  const [files, setFiles] = useState<string[]>([]);

  return (
    <>
      <Button
        color="primary"
        onClick={() => {
          if (
            localStorage.getItem("id") == "2" ||
            localStorage.getItem("id") == "" ||
            localStorage.getItem("id") == "4"
          ) {
            setPermission(false);
            setOpen(!isOpen);
          } else {
            setPermission(true);
          }
        }}
      >
        <HiPencilAlt className="mr-2 text-lg" />
        Edit item
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700 mt-[150px]">
          <strong>Edit product</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="productName">Product name</Label>
                <TextInput
                  id="productName"
                  name="productName"
                  placeholder='Tên mới"'
                  className="mt-1"
                  onChange={(e) => setNameProduct(e.target.value)}
                  value={nameProduct}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  className="border-slate-400 rounded"
                  name="category"
                  id=""
                  onChange={(e) => {
                    setCateProduct(e.target.value);
                  }}
                >
                  <option value="0" selected>
                    Chọn loại truyện
                  </option>
                  <option value="1" selected>
                    Truyện tranh Việt Nam
                  </option>
                  <option value="2" selected>
                    Truyện tranh nước ngoài
                  </option>
                  <option value="3" selected>
                    Chọn loại truyện
                  </option>
                </select>
              </div>
              <div>
                <Label htmlFor="brand">Quantity</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder="Số lượng"
                  className="mt-1"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                  value={quantityProduct}
                />
              </div>
              <div>
                <Label htmlFor="brand">Author</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder="Do ai viết"
                  className="mt-1"
                  onChange={(e) => setAuthorProduct(e.target.value)}
                  value={authorProduct}
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Giá bán lẻ"
                  className="mt-1"
                  onChange={(e) => setPriceProduct(e.target.value)}
                  value={priceProduct}
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="productDetails">Product details</Label>
                <Textarea
                  id="productDetails"
                  name="productDetails"
                  placeholder="Thông tin liên quan cần để cho đoc giả biết thêm về sản phẩm này"
                  rows={6}
                  className="mt-1"
                  onChange={(e) => setDescriptionProduct(e.target.value)}
                  value={desctiptionProduct}
                />
              </div>
              <div className="flex space-x-5"></div>
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                        Upload a file or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const fileList = e.target.files;
                        if (fileList) {
                          const fileNames = Array.from(fileList).map(
                            (file) => file.name
                          );
                          setFiles(fileNames);
                          console.log(files);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => setOpen(false)}>
            Save all
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={permission} onClose={() => setPermission(false)}>
        <Modal.Header>Tài khoản không đủ quyền</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p>Tài khoản cuả bạn không đủ quyền để truy cập phần này</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setPermission(false)}>I accept</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const DeleteProductModal: FC<{ id: number }> = function (props) {
  const [isOpen, setOpen] = useState(false);
  const handleDeleteProduct = async (productId: number) => {
    const res = await axios.put(
      "http://localhost/WriteResfulAPIPHP/admin/product/deleteProduct.php",
      { productId: productId }
    );
    console.log(res.data);
  };
  return (
    <>
      <Button color="failure" onClick={() => setOpen(!isOpen)}>
        <HiTrash className="mr-2 text-lg" />
        Delete item
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-3 pt-3 pb-0">
          <span className="sr-only">Delete product</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-600" />
            <p className="text-lg text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this product?
            </p>
            <div className="flex items-center gap-x-3">
              <Button
                color="failure"
                onClick={() => {
                  handleDeleteProduct(props.id);
                  setOpen(false);
                }}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const ProductsTable: FC = function () {
  const [allProducts, setAllProducts] = useState([]);
  const [clickTitle, setClickTitle] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost/WriteResfulAPIPHP/api/product/read.php"
        );
        setAllProducts(response.data);
      } catch (error) {}
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (clickTitle) {
        try {
          const response = await axios.get(
            "http://localhost/WriteResfulAPIPHP/admin/product/sortTitle.php"
          );
          setAllProducts(response.data);
        } catch (error) {}
        return;
      }
    };
    fetch();
  }, [clickTitle]);

  const formatPrice: (currentPrice: number) => string = (
    currenPrice: number
  ) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(currenPrice);
  };

  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <span className="sr-only">Toggle selected</span>
          <Checkbox />
        </Table.HeadCell>
        <Table.HeadCell
          className="flex items-center gap-2"
          onClick={() => {
            setClickTitle(!clickTitle);
          }}
        >
          Product Name{" "}
          {clickTitle && (
            <div>
              <FaAngleDown />
            </div>
          )}
        </Table.HeadCell>
        <Table.HeadCell>Thumbnail</Table.HeadCell>
        <Table.HeadCell>ID</Table.HeadCell>
        <Table.HeadCell>Price</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {allProducts.map((product: Product) => (
          <Table.Row
            key={product.id}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Table.Cell className="w-4 p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
              <div className="text-base font-semibold text-gray-900 dark:text-white"></div>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {product.title}
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white w-14">
              <img src={product.thumbnail} alt="" />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {product.id}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {product.status == 1 ? "Còn hàng" : "Hết hàng"}
            </Table.Cell>
            <Table.Cell className="space-x-2 whitespace-nowrap p-4">
              <div className="flex items-center gap-x-3">
                <EditProductModal />
                <DeleteProductModal id={product.id} />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default EcommerceProductsPage;
