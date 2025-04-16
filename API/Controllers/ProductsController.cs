using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ProductsController(StoreContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProductsAsync([FromQuery]ProductParams productParams)
    {
      var query = context
                                    .Products
                                    .Sort(productParams.OrderBy)
                                    .Search(productParams.SearchTerm)
                                    .filter(productParams.Brands, productParams.Types)
                                    .AsQueryable();

      var products = await PageList<Product>.ToPageList(query, productParams.PageNumber, productParams.PageSize);

      Response.AddPaginationHeader(products.MetaData);

      return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetProductAsync(int id)
    {
        var product = await context.Products.FindAsync(id);

        if(product == null) return NotFound();

        return Ok(product);
    }
}
