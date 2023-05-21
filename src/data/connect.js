import { connect } from "react-redux";

// Hàm này sẽ map trạng thái store vào props của component
export const mapStateToProps = (state) => ({
  // Truy xuất dữ liệu từ trạng thái store và map vào props
  data: state.data,
});

export const mapDispatchToProps = (dispatch) => ({
  // Tạo ra hàm để dispatch action
  fetchData: () => dispatch(fetchData()),
});

// Sử dụng connect để liên kết component với store
const EnhancedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);

// Sử dụng component đã được liên kết với store
<EnhancedComponent />;
