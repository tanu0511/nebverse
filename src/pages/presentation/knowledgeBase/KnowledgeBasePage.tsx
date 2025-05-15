import React, { useState } from 'react';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';
import Icon from '../../../components/icon/Icon';
import AddArticleModal from './AddArticleModal';
import CategoryModal from './CategoryModal';

const KnowledgeBasePage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [articles, setArticles] = useState<
    { heading: string; category: string; to: string }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingArticle, setEditingArticle] = useState<{ heading: string; category: string; to: string } | null>(null);

  // Handler to add a new category
  const handleAddCategory = (category: string) => {
    if (category && !categories.includes(category)) {
      setCategories((prev) => [...prev, category]);
    }
  };

  const handleDeleteCategory = (cat: string) => {
    setCategories((prev) => prev.filter((c) => c !== cat));
  };

  const handleAddArticle = (article: { heading: string; category: string; to: string }) => {
    if (editingArticle) {
      setArticles((prev) => {
        const idx = prev.findIndex(
          (a) =>
            a.heading === editingArticle.heading &&
            a.category === editingArticle.category &&
            a.to === editingArticle.to
        );
        if (idx !== -1) {
          const updated = [...prev];
          updated[idx] = article;
          return updated;
        }
        return prev;
      });
      setEditingArticle(null);
    } else {
      setArticles((prev) => [...prev, article]);
    }
  };

  // Handler to delete an article
  const handleDeleteArticle = (articleToDelete: { heading: string; category: string; to: string }) => {
    setArticles((prev) =>
      prev.filter(
        (a) =>
          !(
            a.heading === articleToDelete.heading &&
            a.category === articleToDelete.category &&
            a.to === articleToDelete.to
          )
      )
    );
    // Clear editing state if the deleted article is being edited
    if (
      editingArticle &&
      editingArticle.heading === articleToDelete.heading &&
      editingArticle.category === articleToDelete.category &&
      editingArticle.to === articleToDelete.to
    ) {
      setEditingArticle(null);
    }
  };

  const filteredArticles =
    selectedCategory === 'All'
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <div className="container-fluid" style={{ minHeight: '100vh', background: '#f4f6fa' }}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 px-0 py-3" style={{ background: '#eef2f6', minHeight: '100vh' }}>
          <div className="p-3">
            <Input
              type="search"
              placeholder="Search"
              className="mb-3"
              style={{ background: '#fff' }}
            />
            <div className="list-group">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`list-group-item list-group-item-action${
                    selectedCategory === cat ? ' active' : ''
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="col-md-10 py-3">
          <div className="d-flex align-items-center justify-content-between mt-4 mb-3">
            <div>
              <Button color="primary" isLight className="me-2" onClick={() => setShowAddModal(true)}>
                <Icon icon="AddCircle" /> Add New Article
              </Button>
              <Button color="secondary" isLight className="border" onClick={() => setShowCategoryModal(true)}>
                <Icon icon="AddCircle" /> Manage Article Category
              </Button>
            </div>
            <div>
              <Input
                type="search"
                placeholder="Start typing to search"
                style={{ width: 220, background: '#fff' }}
              />
            </div>
          </div>
          <div className="card" style={{ minHeight: 350 }}>
            <div className="card-body">
              <h5 className="mb-4">Knowledge Base</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}>#</th>
                      <th>Article Heading</th>
                      <th>Article Category</th>
                      <th>To</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArticles.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center" style={{ height: 120 }}>
                          <div>
                            <i className="fa fa-list-alt" style={{ fontSize: 32, color: '#b0b8c1' }} />
                          </div>
                          <div className="text-muted mt-2">- No record found. -</div>
                        </td>
                      </tr>
                    ) : (
                      filteredArticles.map((article, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{article.heading}</td>
                          <td>{article.category}</td>
                          <td>{article.to}</td>
                          <td>
                            <Button
                              color="light"
                              size="sm"
                              onClick={() => {
                                setEditingArticle(article);
                                setShowAddModal(true);
                              }}
                            >
                              <i className="fa fa-edit" /> Edit
                            </Button>
                            <Button
                              color="light"
                              size="sm"
                              className="ms-2"
                              onClick={() => handleDeleteArticle(article)}
                            >
                              <i className="fa fa-trash" /> Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddArticleModal
        show={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingArticle(null); // Clear editing state when modal closes
        }}
        categories={categories}
        onAddCategory={handleAddCategory}
        onAddArticle={handleAddArticle}
        editingArticle={editingArticle} // Pass this prop
      />
      {/* Example Category Modal */}
      {showCategoryModal && (
        <CategoryModal
          show={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          categories={categories}
        />
      )}
    </div>
  );
};

export default KnowledgeBasePage;
