package com.pi.digitalbooking.controllers;

import com.pi.digitalbooking.models.Product;
import com.pi.digitalbooking.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    @ResponseBody
    public Product RegisterProduct(@RequestBody Product product) {
        return productService.SaveProduct(product);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Product GetByPathVariable(@PathVariable("id") Integer id) {
        return productService.SearchById(id);
    }

    @GetMapping("/RP")
    @ResponseBody
    public Product GetByRequestParam(@RequestParam Integer id) {
        return productService.SearchById(id);
    }

    @DeleteMapping("/delete")
    public void DeleteProductRP(@RequestParam Integer id) {
        productService.DeleteById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void DeleteProductByPathVariable(@PathVariable("id") Integer id) {
        productService.DeleteById(id);
    }

    @GetMapping()
    @ResponseBody
    public List<Product> SearchAll() {
        return productService.SearchAll();
    }

    @PutMapping("/update")
    @ResponseBody
    public Product UpdateProduct(@RequestBody Product product) {

        return productService.UpdateProduct(product);
    }
}
