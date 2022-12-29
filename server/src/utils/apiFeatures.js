class ApiFeatures {
   constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
   }

   // Search Name
   searchByName() {
   // Search Name
      const keyword = this.queryStr.name
         ? {
              name: {
                 $regex: this.queryStr.name,
                 $options: 'i',
              },
           }
         : {};
         const re = new RegExp(this.queryStr.category); 
         const keywordCate = this.queryStr.category
         ? {
              category: {
                 $regex: re,
                 $options: 'i',
              },
           }
         : {};
         console.log({ ...keyword,...keywordCate });
      this.query = this.query.find({ ...keyword,...keywordCate });
      return this;
   }


   filter() {   
      // Create Function Filter
      const queryCopy = { ...this.queryStr };
      const removeFields = ['name', 'page', 'limit','category'];

      removeFields.forEach(key => {
         delete queryCopy[key];
      });

      //filter for rate and rating.
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
      console.log(queryStr,"queryStr");
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
   }

   // Pagination (Phân Trang)
   pagination(resultPerPage) {
      const currentPage = Number(this.queryStr.page) || 1;

      const skip = resultPerPage * (currentPage - 1);

      this.query = this.query.limit(resultPerPage).skip(skip);

      return this;
   }
}

module.exports = ApiFeatures;

// $regex find word có this.queryStr.keyword ở trong
// $options: "i" không phân biệt hoa hay thường
// return this. là có thể gọi ngay trong khi new đối tượng// tạo instance
